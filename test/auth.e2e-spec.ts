import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; 

describe('Auth E2E Test (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('login the user and return a JWT token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token');
    accessToken = response.body.access_token; 
  });

  it('/post (POST) create first post', async () => {
    const response = await request(app.getHttpServer())
      .post('/post')
      .set('Authorization', `Bearer ${accessToken}`) 
      .send({
        title: 'My First Post',
        content: 'This is the content of my first post.',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('My First Post');
  });

  it('/post (POST) reject create second post', async () => {
    const response = await request(app.getHttpServer())
      .post('/post') 
      .send({
        title: 'My Second Post',
        content: 'This is another post content.',
      });

    expect(response.status).toBe(401); 
  });
});
