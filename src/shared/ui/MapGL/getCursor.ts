type CursorState = {
  isHovering: boolean;
  isDragging: boolean;
};

export function getCursor(state: CursorState) {
  return state.isDragging ? "grabbing" : state.isHovering ? "pointer" : "grab";
}
