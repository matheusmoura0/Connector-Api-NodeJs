const axios = require('axios');

class BrConector {
    static async list() {
        const getData = async () => {
            try {
                const response = await axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider');
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        const data = await getData();
        return this.mapBrData(data);
    };

    static async getById(id) {
        const getData = async () => {
            try {
                const response = await axios.get(`http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/${id}`);
                return response.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        const data = await getData();
        return this.mapBrData([data]);
    };

    static mapBrData(data) {
        return data.map((item) => ({
            "nome": item.nome,
            "descricao": item.descricao,
            "desconto": '0',
            "imagem": item.imagem,
            "preco": item.preco,
            "material": item.departamento,
            "id": "BR" + item.id
        }))
    }
};

module.exports =  BrConector ;