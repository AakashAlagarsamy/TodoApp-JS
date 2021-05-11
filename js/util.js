let n = 0;
export default function utils() {
  return {
    getCounterValue: function () {
      return ++n;
    },
  };
}
