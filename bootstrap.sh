cp -r ./ "$1"
cd "$1"
yarn add -D autoprefixer @babel/core babel-eslint babel-loader \
@babel/preset-env @babel/preset-react \
css-loader del eslint eslint-plugin-react gulp gulp-eslint gulp-replace \
less less-loader postcss-loader string-replace-loader style-loader \
terser-webpack-plugin url-loader webpack webpack-cli webpack-dev-server gulp-cli \
prop-types eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y \
mini-css-extract-plugin optimize-css-assets-webpack-plugin file-loader dotenv

yarn add prop-types react react-dom react-redux react-router-dom redux cross-env

rm "$1/bootstrap.sh"
