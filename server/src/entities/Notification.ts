import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable ,ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity({ name: 'notifications' })

export class Notification {
    @PrimaryGeneratedColumn()
        notiID!: number;
    @Column()
        seen!: boolean;
    @Column()
        type!: string;
    @CreateDateColumn()
        createAt!: Date;
    @ManyToOne(() => Post, (post: Post) => post.notifications, {primary: true})
        @JoinTable({
            name: 'post'
        })
        @JoinColumn({name: 'postID', referencedColumnName: 'postID'})
            post: Post;
    @ManyToOne(() => User, (user: User) => user.notifications, {primary: true})
        @JoinTable({
            name: 'user'
        })
        @JoinColumn({name: 'userID', referencedColumnName: 'userID'})
            user: User;
    
}
