const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
    webpack: {
        alias: {
            '@': resolvePath('src/'),
            '@components': resolvePath('src/Components/'),
            '@assets': resolvePath('./src/common/assets'),
            '@hooks': resolvePath('./src/common/hooks'),
            '@helpers': resolvePath('./src/common/helpers'),
            '@store': resolvePath('./src/actions/store'),
            '@reducers': resolvePath('./src/actions/reducers'),
            '@actionCreators': resolvePath('./src/actions/actionCreators'),
        },
    },
};
