import { Category } from './Category';

describe('Category', () => {
    it('should create an instance', () => {
        expect(new Category(1, 'Test Category')).toBeTruthy();
    });
});