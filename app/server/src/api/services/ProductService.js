import { EuConector } from '../services/EuConector';
import { BrConector } from '../services/BrConector';

class ProductService {
    constructor() {
        this.EuConector = new EuConector();
        this.BrConector = new BrConector();
    }

    async list() {
        const euData = this.EuConector.list();
        const brData = this.BrConector.list();
        const data = await Promise.all([euData, brData]);
        const response = data.flat();
        return response;
    }

    getById(productId) {
        const country = productId.slice(0, 2);
        const id = productId.slice(2);
        if (country === 'EU') return this.EuConector.getById(id).then((data) => data);
        if (country === 'BR') return this.BrConector.getById(id).then((data) => data);
    }
}

module.exports = { ProductService };