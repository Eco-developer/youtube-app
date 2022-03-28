import {
    MenubarContainer, 
    MenubarItemsBase, 
    Item 
} from "./style";
import { 
    Dispatch, 
    SetStateAction, 
    useState 
} from "react";
import { v4 as uuid } from "uuid";

interface Props {
    setSection: Dispatch<SetStateAction<number>>
}

export const MenuBar = ({setSection}: Props) => {
    const items = ["Home", "Videos", "Lists", "Info"];
    const [current, setCurrent] = useState<number>(0);
    
    const handleClick = (index: number) => {
        setCurrent(index);
        setSection(index);
    }
    return (
        <MenubarContainer>
            <MenubarItemsBase>
				{items.map((item: string, index: number) => (

                    <Item 
                        key={uuid()}
                        current={index === current} 
                        onClick={() => handleClick(index)}
                    >	
                        <span>{item}</span>
                    </Item>
				))}
        	</MenubarItemsBase>
        </MenubarContainer>
    )
}