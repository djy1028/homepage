const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
    plugins: [
      {
        plugin: CracoAntDesignPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: {
                "@primary-color": "rgb(0, 82, 204)",
                "@font-size-base": "16px",
                "@border-radius-base": "4px",
                "@table-padding-vertical": "1rem",
                "@table-padding-horizontal":".6rem",
                "@tabs-vertical-padding":"4px"
              },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };