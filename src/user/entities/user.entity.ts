import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../../post/entities/post.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @OneToMany(() => Post, (post) => post.user) // Relasi One-to-Many ke Post
  posts: Post[];
}