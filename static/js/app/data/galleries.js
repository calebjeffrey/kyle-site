define(function(require, exports, module) {
    module.exports = [
        {
            "title": "allaprima",
            "previousGallery": "studies",
            "nextGallery": "cityscapes"
        },
        {
            "title": "cityscapes",
            "previousGallery": "allaprima",
            "nextGallery": "pleinair"
        },
        {
            "title": "pleinair",
            "previousGallery": "cityscapes",
            "nextGallery": "portraits"
        },
        {
            "title": "portraits",
            "previousGallery": "pleinair",
            "nextGallery": "studies"
        },
        {
            "title": "studies",
            "previousGallery": "portraits",
            "nextGallery": "allaprima"
        }
    ];

    return module.exports;

});