import { createActionCreator } from './actions';

describe('actions', () => {
    describe('#createActionCreator', () => {
        it('should create action with provided `type`', () => {
            const type = 'test-type';
            const actionCreator = createActionCreator(type);

            expect(actionCreator().type).toEqual(type);
        })

        it('should create action with provided `payload`', () => {
            const payload = 'test-payload';
            const actionCreator = createActionCreator<string>('test-type');

            expect(actionCreator(payload).payload).toEqual(payload);
        })

        it('should create action with provided `meta`', () => {
            const meta = 'test-meta';
            const actionCreator = createActionCreator<undefined, string>('test-type');

            expect(actionCreator(undefined, meta).meta).toEqual(meta);
        })

        it('should create action creator which stringifies to provided `type`', () => {
            const type = 'test-type';
            const actionCreator = createActionCreator(type);

            expect(actionCreator.toString()).toEqual(type);
        });
    });
});