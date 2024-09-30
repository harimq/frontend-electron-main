import dynamic from "next/dynamic";

import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ClassificationsReports } from "@/Store/Reducer/ReportsSlice";
import moment from "moment";
import { DateFiler, TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { setParamsData } from "@/Store/Reducer/CommonSlice";
const Table = dynamic(() => import("@/components/tables/Table"), {
  ssr: false,
});

const TableHeader = dynamic(() => import("../../TableHeader"), {
  ssr: false,
});

const ClassificationReportTable = ({ extractionDetailParams }: any) => {
  const { classificationsReports } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const columns: TableColumn[] = [
    {
      Header: "Case ID",
      accessor: "case_id",
      sort: true,
    },
    {
      Header: "Document Name",
      accessor: "document_name",
      sort: true,
    },
    {
      Header: "Page",
      accessor: "page_index",
      sort: true,
      Cell: (column) => {
        return (
          <Typography
         
            variant="body2"
          >
            {column.value + 1}
          </Typography>
        );
      },
    },
    {
      Header: "Page Name",
      accessor: "verified_value",
      sort: true,
    },
    {
      Header: "Confidence",
      accessor: "confidence",
      sort: true,
    },
    {
      Header: "Do Classification ",
      accessor: "do_classification",
      Cell: (column) => {
        return (
          <Typography
            style={{ color: column.value ? "#47D8A4" : "#FF5F5F" }}
            variant="body2"
          >
            {column.value ? "True" : "False"}
          </Typography>
        );
      },
    },
    {
      Header: "Edited",
      accessor: "edited",
      Cell: (column) => {
        return (
          <Typography
            style={{ color: column.value ? "#47D8A4" : "#FF5F5F" }}
            variant="body2"
          >
            {column.value ? "True" : "False"}
          </Typography>
        );
      },
    },
  ];

  const dispatch = useDispatch<AppDispatch>();

  // const dateTimeFilter = (item: DateFiler[]) => {
  //   let updateData = {
  //     from_date: moment(item[0].startDate).format("YYYY-M-D"),
  //     to_date: moment(item[0].endDate).format("YYYY-M-D"),
  //   };
  //   if (updateData.from_date && updateData.to_date) {
  //     dispatch(
  //       setParamsData(
  //         `?from_date=${updateData.from_date}&to_date=${updateData.to_date}&`
  //       )
  //     );

  //     dispatch(
  //       ClassificationsReports(`?from_date=${updateData.from_date}&to_date=${updateData.to_date}
  //     `)
  //     );
  //   }
  // };



  useEffect(() => {
    const params: any = new URLSearchParams(searchParams);
    let combinedParams = "";
    for (const [key, value] of params) {
      if (value != "") {
        combinedParams += `&${value.slice(1)}`;
      } else {
        combinedParams += `${value.slice(1)}`;
      }
    }

    combinedParams = combinedParams.slice(1);
    if (combinedParams) {
      dispatch(ClassificationsReports(`${extractionDetailParams}?${combinedParams}`));
    }
  }, [searchParams]);
  return (
    <div className=" flex flex-col gap-y-4">
      <TableHeader
        tableHeader={columns}
        // dateTimeFilter={(e) => dateTimeFilter(e)}
        // serachFunction={(e: string) =>{ dispatch(ClassificationsReports(e));
        //   dispatch(setParamsData(`${e}&`))
        // }}
      />

      {extractionDetailParams && (
        <Table
          columns={columns}
          data={classificationsReports && classificationsReports?.data}
          pagination={true}
          isCheckbox={false}
          isStatus={false}
          dataPage={classificationsReports?.meta}
          dispatchFunction={(e: number) =>
            ClassificationsReports(`${extractionDetailParams}${e}`)
          }
        />
      )}
    </div>
  );
};

export default ClassificationReportTable;