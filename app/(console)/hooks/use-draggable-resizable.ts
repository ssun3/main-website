import { type MouseEvent, useCallback, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export function useDraggableResizable(
  initialPosition: Position,
  initialSize: Size,
  minWidth = 200,
  minHeight = 100,
) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [size, setSize] = useState<Size>(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button !== 0) return;
      setIsDragging(true);
      const startX = e.clientX - position.x;
      const startY = e.clientY - position.y;

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        setPosition({
          x: e.clientX - startX,
          y: e.clientY - startY,
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position],
  );

  const handleResizeMouseDown = useCallback(
    (e: MouseEvent, direction: string) => {
      e.stopPropagation();
      e.preventDefault();
      setIsResizing(true);
      setResizeDirection(direction);

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = size.width;
      const startHeight = size.height;
      const startPosX = position.x;
      const startPosY = position.y;

      const handleMouseMove = (e: globalThis.MouseEvent) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newX = startPosX;
        let newY = startPosY;

        if (direction.includes("e")) {
          newWidth = Math.max(startWidth + deltaX, minWidth);
        }
        if (direction.includes("w")) {
          const potentialWidth = Math.max(startWidth - deltaX, minWidth);
          if (potentialWidth !== startWidth) {
            newX = startPosX + (startWidth - potentialWidth);
            newWidth = potentialWidth;
          }
        }
        if (direction.includes("s")) {
          newHeight = Math.max(startHeight + deltaY, minHeight);
        }
        if (direction.includes("n")) {
          const potentialHeight = Math.max(startHeight - deltaY, minHeight);
          if (potentialHeight !== startHeight) {
            newY = startPosY + (startHeight - potentialHeight);
            newHeight = potentialHeight;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        setResizeDirection("");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position, size, minWidth, minHeight],
  );

  return {
    position,
    size,
    isDragging,
    isResizing,
    resizeDirection,
    handleMouseDown,
    handleResizeMouseDown,
    setPosition,
    setSize,
  };
}
