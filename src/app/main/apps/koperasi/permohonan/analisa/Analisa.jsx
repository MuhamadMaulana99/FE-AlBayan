import { List, ListItem, Checkbox, ListItemText, ListSubheader } from '@mui/material';
import dataAnalisa from './dataAnalisa';

export default function Analisa(props) {
  const { selectedItems, selectedItemsValue, setSelectedItems, setSelectedItemsValue } = props;
  //   const [selectedItems, setSelectedItems] = useState([]);
  //   const [selectedItemsValue, setSelectedItemsValue] = useState([]);
  //   console.log(selectedItemsValue, 'selectedItemsValue');

  const handleToggle = (option, idChild) => {
    const currentIndex = selectedItems.indexOf(idChild);
    const newSelectedItems = [...selectedItems];
    const newSelectedItemsValue = [...selectedItemsValue];

    if (currentIndex === -1) {
      newSelectedItems.push(idChild);
      newSelectedItemsValue.push(option?.scores);
    } else {
      newSelectedItems.splice(currentIndex, 1);
      newSelectedItemsValue.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
    setSelectedItemsValue(newSelectedItemsValue);
  };

  const alphabetArray = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

  // 0 + 1 + 2 + 3 + 4
  //   const initialValue = 0;
  //   const sumSelected = selectedItemsValue.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue,
  //     initialValue
  //   );

  //   console.log(sumSelected, 'sum');
  //   function hitungPersentase(nilai, totalNilai) {
  //     const persen = (nilai / totalNilai) * 100;
  //     return Math.round(persen);
  //   }

  //   const persentase = hitungPersentase(sumSelected, 370);
  //   console.log(`Persentase: ${persentase}%`);
  //   props?.propsFromParent(persentase);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '100%',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {dataAnalisa.map((item, index) => (
        <li key={`section-${item}`}>
          <ul>
            <ListSubheader color="inherit">{` ${alphabetArray[index]}. ${item?.parent}`}</ListSubheader>
            {item?.child.map((option) => (
              <ListItem
                key={option.idChild}
                button
                onClick={() => handleToggle(option, option.idChild)}
              >
                <Checkbox checked={selectedItems.includes(option.idChild)} />
                <ListItemText primary={option.keterangan} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}
