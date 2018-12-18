// 此文件用于node不完全支持import
require('babel-core/register')({
    'presets': [
        'stage-3',
        ['latest-node', { 'target': 'current' }]
    ]
});

require('./src/index.js');