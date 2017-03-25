module.exports = {
  type: 'react-component',
  karma: {
    frameworks: ['mocha', 'chai', 'chai-as-promised'],
    plugins: [
      require('karma-chai-plugins') // Provides chai, chai-as-promised, ...
    ]
  },
  npm: {
    esModules: true,
    umd: {
      global: 'ReactPaginator',
      externals: {
        react: 'React'
      }
    }
  }
}
