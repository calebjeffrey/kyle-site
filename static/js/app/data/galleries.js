define(function(require, exports, module) {
    module.exports = [
        {
            "title": "portraits",
            "previousGallery": "studies",
            "nextGallery": "cityscapes"
        },
        {
            "title": "cityscapes",
            "previousGallery": "portraits",
            "nextGallery": "pleinair"
        },
        {
            "title": "pleinair",
            "previousGallery": "cityscapes",
            "nextGallery": "studies"
        },
        {
            "title": "studies",
            "previousGallery": "pleinair",
            "nextGallery": "portraits"
        }
    ];

    return module.exports;

});