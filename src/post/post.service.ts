import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: any): Promise<Post> {
    const newPost = this.postRepository.create({
      ...createPostDto,
      user: user,
    });

    return await this.postRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  private async validateOwnership(postId: number, userId: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    if (post.user.id != userId) {
      throw new UnauthorizedException(`You can only manage your own posts`);
    }

    return post;
  }

  async update(id: number, tokenUserId: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.validateOwnership(id, tokenUserId);
    Object.assign(post, updatePostDto);
    return await this.postRepository.save(post);
  }

  async remove(id: number, tokenUserId: number): Promise<void> {
    const post = await this.validateOwnership(id, tokenUserId); 
    await this.postRepository.remove(post); 
  }
}
