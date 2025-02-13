const TOTAL_ROWS_KEY = "ROW-COUNT-APP__TOTAL-ROWS";
const COMPLETED_ROWS_KEY = "ROW-COUNT-APP__COMPLETED-ROWS";

class State {
  private _totalRows: number;
  private _completedRows: number;

  constructor(totalRows: number, completedRows: number) {
    this._totalRows = totalRows;
    this._completedRows = completedRows;
  }

  get totalRows() {
    return this._totalRows;
  }

  set totalRows(rows: number) {
    this._totalRows = rows;
  }

  get completedRows() {
    return this._completedRows;
  }

  set completedRows(rows: number) {
    this._completedRows = rows;
  }
}

const getTotalRows = (): number => {
  const savedTotalRows = parseInt(localStorage.getItem(TOTAL_ROWS_KEY) ?? "");
  if (isNaN(savedTotalRows)) {
    setTotalRows(100);
    return 100;
  }
  return savedTotalRows;
};

const setTotalRows = (rows: number) =>
  localStorage.setItem(TOTAL_ROWS_KEY, `${rows}`);

const getCompletedRows = (): number => {
  const savedCompletedRows = parseInt(
    localStorage.getItem(COMPLETED_ROWS_KEY) ?? ""
  );
  if (isNaN(savedCompletedRows)) {
    setCompletedRows(0);
    return 0;
  }
  return savedCompletedRows;
};

const setCompletedRows = (rows: number) =>
  localStorage.setItem(COMPLETED_ROWS_KEY, `${rows}`);

const initButton = (
  index: number,
  completed: boolean,
  onclick: (_: any) => void
): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = `${index}`;
  button.onclick = onclick;
  button.setAttribute("data-row", `${index}`);
  button.className = completed ? "comleted" : "";
  return button;
};

const initButtons = (
  numButtons: number,
  completedRows: number,
  onclick: (_: any) => void
): HTMLButtonElement[] => {
  const buttons: HTMLButtonElement[] = [];
  for (let index = 1; index <= numButtons; index++) {
    buttons.push(initButton(index, index <= completedRows, onclick));
  }
  return buttons;
};

const updateButtons = (buttons: HTMLButtonElement[], completedRows: number) => {
  buttons.forEach((button, index) => {
    button.className = index + 1 <= completedRows ? "completed" : "";
  });
};

const init = () => {
  const totalRows = getTotalRows();
  const completedRows = getCompletedRows();
  const state = new State(totalRows, completedRows);
  const grid = document.getElementById("button-grid");
  if (!grid) {
    alert("No grid found.");
    return;
  }
  let buttons: HTMLButtonElement[] = []; //initButtons(state.totalRows);

  const updateCompletedRows = (rows: number) => {
    if (rows > 0 && rows <= state.totalRows) {
      state.completedRows = rows;
      setCompletedRows(state.completedRows);
      updateButtons(buttons, state.completedRows);
    }
  };

  const onClick = (evt: MouseEvent) => {
    const button = evt.target;
    if (!button || !(button instanceof HTMLButtonElement)) return;
    const completedRows = parseInt(button.getAttribute("data-row") ?? "");
    updateCompletedRows(completedRows);
  };

  buttons = initButtons(state.totalRows, state.completedRows, onClick);
  buttons.forEach((button) => grid.appendChild(button));
};

init();
