import 'postcss-pxtorem'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*']
    }
  }
}

export default config
