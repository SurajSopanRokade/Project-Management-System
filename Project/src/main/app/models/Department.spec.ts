import { Department } from './Department';

describe('Department', () => {
    it('should create an instance', () => {
        expect(new Department(1, 'Test Department')).toBeTruthy();
    });
});