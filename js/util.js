let n = 0;
export default function utils() {
  return {
    n,
    getCounterValue: function () {
      return ++n;
    },
  };
}
