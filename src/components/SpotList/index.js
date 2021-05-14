import OrderList from 'components/SpotList/OrderList';
import TradeList from 'components/SpotList/TradeList';

const SpotList = ({
  type, headerItem = [], items = [], gapInfo = {},
}) => (
  <div>
    {type === 'order' ? (
      <OrderList
        headerItem={headerItem}
        rowItem={items}
        gapInfo={gapInfo}
      />
    )
      : <TradeList headerItem={headerItem} rowItems={items} />}
  </div>
);

export default SpotList;
