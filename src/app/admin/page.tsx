{
  header: 'Amount',
  accessor: 'amount',
  cell: (value) => (
    <span className="font-medium">
      ${typeof value === 'number' ? value.toLocaleString() : '0'}
    </span>
  ),
}, 