import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import GameConfigForm from '../components/GameConfigForm'
import '@testing-library/jest-dom'


test('it shows four inputs and a button', () => {

    render(<GameConfigForm />);

    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    expect(inputs).toHaveLength(4);
    expect(button).toBeInTheDocument();
});

test('it calls onGameConfigAdd when the form is submitted', () => {

    const mock = jest.fn();

    render(<GameConfigForm onGameConfigAdd={mock}/>);

    //const [playerNameInput, widthInput, heightInput, bombsInput] = screen.getAllByRole('textbox');

    const playerNameInput = screen.getAllByRole('textbox', {
        playerName: /player/i
    });

    const widthInput = screen.getAllByRole('textbox', {
        width: /Width/i
    });

    const heightInput = screen.getAllByRole('textbox', {
        height: /Height/i
    });

    const bombsInput = screen.getAllByRole('textbox', {
        bombs: /Number of Bombs/i
    });

    user.click(playerNameInput);
    user.keyboard('Damith');

    user.click(widthInput);
    user.keyboard('16');

    user.click(heightInput);
    user.keyboard('16');

    user.click(bombsInput);
    user.keyboard('10');

    const button = screen.getByRole('button');

    user.click(button);

    //expect(mock).toHaveBeenCalled();
    //expect(mock).toHaveBeenCalledWiith({ playerName: 'Damith', width: '16', 
    // height: '16', bombs:'10'});


});