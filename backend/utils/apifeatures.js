class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //small i for case insensitive
          },
        }
      : {};
    //console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };

    // removing  some fields fr category
    const removefields = ["keywords", "page", "limit"];

    removefields.forEach((key) => delete queryCopy[key]);

    //filter for price and rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    //console.log(queryStr);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    //curentpage = 2  resultperpage = 5 , so 5*(2-1)=5 i.e skip 5 items and display from 6th
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
module.exports = ApiFeatures;
