export const ColumnDefinition = [
  {
    accessorKey: "source_ip",
    header: "Source IP",
    enableMultiSort: true,
  },
  {
    accessorKey: "source_port",
    header: "Source Port",
    enableMultiSort: true,
  },
  {
    accessorKey: "target_ip",
    header: "Target IP",
    enableMultiSort: true,
  },
  {
    accessorKey: "target_port",
    header: "Target Port",
    enableMultiSort: true,
  },
  {
    accessorKey: "protocol",
    header: "Protocol",
    enableMultiSort: true,
  },
  {
    accessorKey: "l7_protocol",
    header: "L7 Protocol",
    enableMultiSort: true,
  },
  {
    accessorKey: "input_bytes",
    header: "Input Bytes",
    enableMultiSort: true,
  },
  {
    accessorKey: "output_bytes",
    header: "Output Bytes",
    enableMultiSort: true,
  },
  {
    accessorKey: "input_packets",
    header: "Input Packets",
    enableMultiSort: true,
  },
  {
    accessorKey: "output_packets",
    header: "Output Packets",
    enableMultiSort: true,
  },
  {
    accessorKey: "sum_tcp_flags",
    header: "Sum TCP Flags",
    enableMultiSort: true,
  },
  {
    accessorKey: "flow_duration",
    header: "Flow Duration",
    enableMultiSort: true,
  },
  {
    accessorKey: "anomality",
    header: "Anomaly",
    enableMultiSort: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "attack_id",
    header: "Attack ID",
    enableMultiSort: true,
  },
  {
    accessorKey: "conf",
    header: "Confidence",
    enableMultiSort: true,
    cell: ({ cell, row }) => {
      return row.original.conf.toFixed(3);
    },
  },
  {
    accessorKey: "attack_name",
    header: "Attack Name",
    enableMultiSort: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    enableMultiSort: true,
  },
];
