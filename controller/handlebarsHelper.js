'use strict'
const helper = {};

helper.createStarList = (stars) => {
    let star = Math.floor(stars);
    let half = stars - star;
    let str = '<div class="d-flex mb-2">';
    let i;
    for (i = 0; i < star; i++) {
        str += '<i class="fa fa-star text-secondary"></i>';
    }
    if (half > 0) {
        str += '<i class="fa fa-star-half text-secondary"></i>';
    }
    for (; i < 5; i++) {
        str += '<i class="fa fa-star "></i>';
    }
    str += '</div>';
    return str;
};

module.exports = helper;