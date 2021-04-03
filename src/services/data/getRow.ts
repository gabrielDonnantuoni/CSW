export default <T>(type: 'f' | 'r', array: T[]) => {
  switch (type) {
    case 'f':
      return {
        id: 1, name: 'Esforços Externos', fx: array[0], fy: array[1], Mz: array[2] };
    case 'r':
      return { id: 1, name: 'Restrições', rx: array[0], ry: array[1], rz: array[2] };
    default:
      return {};
  }
};
