import { render, fireEvent } from '@testing-library/react';
import ShowBoard from '../components/ShowBoard';
import '@testing-library/jest-dom'

describe('ShowBoard component', () => {
  const config = { width: 5, height: 5, bombs: 5 };
  let component;
  beforeEach(() => {
    component = render(<ShowBoard config={config} />);
  });

  test('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  test('displays game title', () => {
    expect(component.getByText('This is the game board !')).toBeInTheDocument();
  });

  test('initializes game board data', () => {
    expect(component.container.querySelector('.game-canvas')).not.toBeNull();
    expect(component.container.querySelectorAll('.cell')).toHaveLength(25);
  });

//   test('reveals a cell when clicked', () => {
//     const cell = component.container.querySelector('.cell');
//     fireEvent.click(cell);
//     expect(cell.classList.contains('revealed')).toBe(true);
//   });
});