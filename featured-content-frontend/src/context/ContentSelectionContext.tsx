import { ReactNode, createContext, useReducer } from "react";

export enum ContentSelectionActionEnum {
  SET_ITEM_QTY = "SET_ITEM_QTY",
  SET_CURRENT_DATE = "SET_CURRENT_DATE",
}

export interface ContentSelectionContextProps {
  itemQty: number;
  setItemQty: (value: number) => void;
  currentDate: Date;
  setCurrentDate: (value: any) => void;
}

const initialState: ContentSelectionContextProps = {
  itemQty: 1,
  setItemQty: (value: number) => {},
  currentDate: new Date(),
  setCurrentDate: (value: any) => {},
};

export const ContentSelectionContext = createContext(initialState);

function contentSelectionReducer(
  state: ContentSelectionContextProps,
  action: { type: ContentSelectionActionEnum; payload: any }
): ContentSelectionContextProps {
  switch (action.type) {
    case ContentSelectionActionEnum.SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };

    case ContentSelectionActionEnum.SET_ITEM_QTY:
      return {
        ...state,
        itemQty: action.payload,
      };

    default: {
      return state;
    }
  }
}

export const ContentSelectionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(contentSelectionReducer, initialState);

  function setCurrentDate(value: any) {
    dispatch({
      type: ContentSelectionActionEnum.SET_CURRENT_DATE,
      payload: value,
    });
  }

  function setItemQty(value: number) {
    dispatch({
      type: ContentSelectionActionEnum.SET_ITEM_QTY,
      payload: value,
    });
  }

  return (
    <ContentSelectionContext.Provider
      value={{
        setItemQty,
        setCurrentDate,
        itemQty: state.itemQty,
        currentDate: new Date(state.currentDate),
      }}
    >
      {children}
    </ContentSelectionContext.Provider>
  );
};
