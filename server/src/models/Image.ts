import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import NursingHomes from './NursingHomes';

@Entity('images')

export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    path: string;

    // relacionamento inverso
    @ManyToOne(() => NursingHomes, nursinghomes => nursinghomes.images)
    @JoinColumn({name: 'nursinghomes_id'})
    nursinghomes: NursingHomes;
}