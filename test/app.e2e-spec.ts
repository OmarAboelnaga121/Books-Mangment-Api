import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { spec, request } from 'pactum';
import { AppModule } from './../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    
    await app.init();
    await app.listen(3333);
    request.setBaseUrl('http://localhost:3333');
    
  }, 10000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  }, 10000);


  describe('Health Check', () => {
    it('should return 404 for non-existent route', async () => {
      await spec()
        .get('/')
        .expectStatus(404);
    }); 
  });

  describe('Auth', () => {
    it('Successful Register', ()=>{
      return spec()
        .post('/auth/register')
        .withJson({
          "name": "Omar Wael",
          "email": "p@o.com",
          "password": "Password@1111",
          "role": "admin",
          "profileImageUrl": "string"
        })
        .withFile('profileImageUrl', 'test/test.png') 
        .expectStatus(200);
    })
  })
  describe('Users', () => {})
  describe('Books', () => {})
});
