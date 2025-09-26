const webpackConfigPath = 'react-scripts/config/webpack.config.js'
const webpackConfig = require(webpackConfigPath)

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

function override(config) {
	config.module.rules[shouldUseSourceMap ? 1 : 0].oneOf.splice(0, 0, {
		test: /\.(glsl|vert|frag)$/,
		type: 'asset/source',
	})
	return config
}

require.cache[require.resolve(webpackConfigPath)].exports = (env) =>
	override(webpackConfig(env))

module.exports = require(webpackConfigPath)
