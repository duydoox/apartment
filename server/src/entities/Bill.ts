import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Room } from './Room';
import { User } from './User';
import { UserBill } from './UserBill.';

@Entity({name: 'bills'})

export class Bill {
    @PrimaryGeneratedColumn()
        billID!: number;
    
    @Column()
        electricNumber!: number;
    
    @Column() 
        waterBlockNumber!: number;
    
    @Column()
        paid!: boolean;

    @Column()
        sent!: boolean;

    @CreateDateColumn()
        createAt!: Date;

    @UpdateDateColumn()
        updateAt!: Date;

    @ManyToOne(() => Room, room => room.bills)
    @JoinColumn({ name: 'roomID' })
        room: Room;

    @OneToMany(() => UserBill, (userBill) => userBill.bill)
        userBills: UserBill[];
}