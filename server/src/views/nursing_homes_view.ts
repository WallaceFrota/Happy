import NursingHomes from '../models/NursingHomes';
import imageView from './images_view';
export default {
    render(nursinghome: NursingHomes) {
        return { 
            id: nursinghome.id,
            name: nursinghome.name,
            latitude: nursinghome.latitude,
            longitude: nursinghome.longitude,
            about: nursinghome.about,
            instructions: nursinghome.instructions,
            opening_hours: nursinghome.opening_hours,
            open_on_weekends: nursinghome.open_on_weekends,
            images: imageView.renderMany(nursinghome.images)
        };
    },
    // retorna varios lares, para cada um chama o metodo acima
    renderMany(nursinghomes: NursingHomes[]) {
        return nursinghomes.map(nursinghome => this.render(nursinghome));
    } 
}