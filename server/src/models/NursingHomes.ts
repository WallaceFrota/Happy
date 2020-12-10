import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './Image';

@Entity('nursinghomes')

export default class NursingHomes {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    latitude: number;
    
    @Column()
    longitude: number;
    
    @Column()
    about: number;
    
    @Column()
    instructions: string;
    
    @Column()
    opening_hours: string;
    
    @Column()
    open_on_weekends: boolean;

    // relacionamento
    @OneToMany(() => Image, image => image.nursinghomes, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'nursinghomes_id'})
    images: Image[];
}