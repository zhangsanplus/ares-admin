import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        'Chrome > 60',
        'ff > 60',
        '> 0.3%',
        'not IE 11',
        'not dead',
      ],
      flexbox: 'no-2009', // 针对 flexbox 的兼容
      grid: true, // 针对 grid 的兼容
    }),
  ],
}
