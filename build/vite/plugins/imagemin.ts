/**
 * 图片压缩
 * 该插件国内安装容易失败,有需要再开启
 * https://github.com/anncwb/vite-plugin-imagemin
 */
// import viteImagemin from 'vite-plugin-imagemin'

// export default function configImageminPlugin() {
//   const imageminPlugin = viteImagemin({
//     gifsicle: {
//       optimizationLevel: 7,
//       interlaced: false,
//     },
//     optipng: {
//       optimizationLevel: 7,
//     },
//     mozjpeg: {
//       quality: 20,
//     },
//     pngquant: {
//       quality: [0.8, 0.9],
//       speed: 4,
//     },
//     svgo: {
//       plugins: [
//         {
//           name: 'removeViewBox',
//         },
//         {
//           name: 'removeEmptyAttrs',
//           active: false,
//         },
//       ],
//     },
//   })
//   return imageminPlugin
// }
