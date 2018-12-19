export class Pagination {
    order: string;
    size: number = 100;
    total: number = 0;
    filter: string = "";
    numberOfPage: number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
