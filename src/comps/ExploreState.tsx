import * as React from 'react';

interface Props {}


const ExploreState: React.FC<Props> = () => {
    const [state, setState] = React.useState({
        one: 1,
        two: 'two',
        three: {
            foo: 'bar',
            bar: {
                baz: 'boo'
            }
        }
    });

    return (
        <div style={{ maxWidth: 450, paddingTop: 50 }}>
            <button style={{height: 60, width: 175, fontSize: 15}} onClick={() => { setState(state => {
                console.log('\n', '\n', `state = `, state, '\n', '\n');
                const spreadState = {...state}
                console.log('\n', '\n', `spreadState = `, spreadState, '\n', '\n');
                const newOne = state.one + 1 
                console.log('\n', '\n', `newOne = `, newOne, '\n', '\n');
                return {
                    ...state,
                    one: newOne
                }
            }) }}>
                State Explore {state.one}
            </button>
        </div>
    );
};

export default ExploreState;
