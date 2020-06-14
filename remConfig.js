// export default function() {
//   // var devicePixelRatio = 1;
//   // var scale = 1 / devicePixelRatio;
//   // document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
//   // 7.5根据设计稿的横向分辨率/100得来
//   // alert(document.documentElement.clientWidth)
//   var deviceWidth = document.documentElement.clientWidth;
//   // var deviceWidth = window.screen.availWidth
//   // alert(navigator.userAgent)
//   // alert(deviceWidth)
//   // console.log(navigator.userAgent)
//   if(deviceWidth > 750) {
//       // deviceWidth = 750;
//       deviceWidth = 7.5 * 50;
//   }

//   document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
//   // 禁止双击放大
//   document.documentElement.addEventListener('touchstart', function (event) {
//       if (event.touches.length > 1) {
//           event.preventDefault();
//       }
//   }, false);
//   var lastTouchEnd = 0;
//   document.documentElement.addEventListener('touchend', function (event) {
//       var now = Date.now();
//       if (now - lastTouchEnd <= 300) {
//           event.preventDefault();
//       }
//       lastTouchEnd = now;
//   }, false);
// }
// docEl.style.fontSize  = 100 * (调试设备宽度 750 / 设计图宽度750) + 'px';


// https://www.jianshu.com/p/ccbe9eb285e2

const baseSize = 32
// 设置 rem 函数
function setRem () {
  // alert(document.documentElement.clientWidth)
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}