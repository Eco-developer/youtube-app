import {
    MenubarContainer, 
    MenubarItemsBase, 
    Item 
} from "./style";
import { useState } from "react";
import { v4 as uuid } from "uuid";


export const MenuBar = () => {
    const items = ["Videos", "Channels"];
    const [current, setCurrent] = useState<number>(0);
    

    return (
        <MenubarContainer>
            <MenubarItemsBase>
				{items.map((item: string, index: number) => (

                    <Item 
                        key={uuid()}
                        current={index === current} 
                        onClick={() => setCurrent(index)}
                    >	
                        <span>{item}</span>
                    </Item>
				))}
        	</MenubarItemsBase>
        </MenubarContainer>
    )
}