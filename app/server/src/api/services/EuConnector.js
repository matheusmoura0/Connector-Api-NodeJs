import axios from 'axios';

class EuConector {
    static async list() {
        const getData = async () => {
            try {
                const response = await axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider');
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        const data = await getData();
        return this.mapEuData(data);
    };

    static async getById(id) {
        const getData = async () => {
            try {
                const response = await axios.get(`http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/${id}`);
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        const data = await getData();
        return this.mapEuData([data]);
    }

    static mapEuData(data) {
        return data.map((item) => ({
            "nome": item.name,
            "descricao": item.description,
            "desconto": item.discountValue,
            "imagem": item.gallery.map((image) => image),
            "preco": item.price,
            "material": item.details.material,
            "id": "EU" + item.id
        }))
    }
}

export { EuConector };