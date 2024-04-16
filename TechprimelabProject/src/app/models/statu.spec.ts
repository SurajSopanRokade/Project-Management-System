import { Status } from './status';

describe('status', () => {
    it('should create an instance', () => {
        expect(new Status(1, 'Test Status')).toBeTruthy();
    });
});