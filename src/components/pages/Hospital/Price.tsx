/* eslint-disable react-hooks/rules-of-hooks */
import { Column, useTable } from "react-table";
<<<<<<< HEAD
=======
import { IGetHospitalInfo } from "@/service/apis";
>>>>>>> 5865ce9 (feat: 병원 상세 가격정보 api)
import React, { FC, useMemo } from "react";

import { IGetHospitalInfo } from "@/service/apis";
import ReactTable from "react-table";
import styled from "@emotion/styled";

interface IPriceProps {
<<<<<<< HEAD
  hospitalData?: IGetHospitalInfo;
}

const Price: FC<IPriceProps> = ({ hospitalData }) => {
  const data = useMemo(
    () => [
      {
        type: "도수치료 A (30분당)",
        note: "물리치료사,요추또는경추,개인보험없을시",
        price: "1,000,000원",
      },
      {
        type: "도수치료 B (30분당)",
        note: "원장이 직접 실시",
        price: "100,000원",
      },
      {
        type: "도수치료 A (30분당)",
        note: "원장이 직접 실시",
        price: "250,000원",
      },
    ],
    []
  );

  // const data = useMemo(
  //   () => [
  //     {
  //       name: "도수치료 A (30분당)",
  //       description: "물리치료사,요추또는경추,개인보험없을시",
  //       price: "1,000,000원",
  //     },
  //     {
  //       name: "도수치료 B (30분당)",
  //       description: "원장이 직접 실시",
  //       price: "100,000원",
  //     },
  //     {
  //       name: "도수치료 A (30분당)",
  //       description: "원장이 직접 실시",
  //       price: "250,000원",
  //     },
  //   ],
  //   []
  // );
=======
  hospitalData: IGetHospitalInfo;
  hospitalTreatmentsData: [
    {
      uuid: string;
      name: string;
      hospital: string;
      price: number | string;
      price_per_hour: number;
      description: string;
      created_at: string;
    }
  ];
}

const Price: FC<IPriceProps> = ({ hospitalData, hospitalTreatmentsData }) => {
  const data = useMemo(() => {
    return hospitalTreatmentsData.map((data) => {
      return { ...data, price: data.price.toLocaleString() };
    });
  }, [hospitalTreatmentsData]);

>>>>>>> 5865ce9 (feat: 병원 상세 가격정보 api)
  const columns: ReadonlyArray<Column> = useMemo(
    () => [
      {
        Header: "구분",
        accessor: "name",
        width: 100,
      },
      {
        Header: "특이사항",
        accessor: "description",
      },
      {
        Header: "금액",
        accessor: "price",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <PriceWrapper>
      <div className="price-head">
        <div className="left">60분 치료 시</div>
        <div className="center">
          <span>80,000원</span>
          <div className="line"></div>
        </div>
        <div className="right">.</div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <th {...column.getHeaderProps()} key={j}>
                  <span
                    className={j === 6 ? "red" : j === 5 ? "purple" : "black"}
                  >
                    {column.render("Header")}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, j) => {
                  return (
                    <td {...cell.getCellProps()} key={j}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className="etc">
        <li>
          비급여 진료비용 공개제도에 의해 병원이 직접 건강보험심사평가원에
          제출한 가격정보입니다.
        </li>
        <li>진료시 상황 등에 따라 실제 치료비와는 다를 수 있습니다.</li>
      </ul>
    </PriceWrapper>
  );
};

export default Price;

const PriceWrapper = styled.div`
  .price-head {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 2rem;
    text-align: center;
    gap: 0.5rem;

    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30%;
      height: 2.5rem;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      background-color: rgba(128, 227, 161, 0.1);
      color: ${(props) => props.theme.colors.green};
      border-radius: 1rem;
    }

    .center {
      font-size: ${(props) => props.theme.fontSizes.xl};
      line-height: ${(props) => props.theme.lineHeights.xl};
      color: ${(props) => props.theme.colors.purple};
      width: 40%;
      font-weight: 700;
      position: relative;

      .line {
        position: absolute;
        border: 0.2rem solid ${(props) => props.theme.colors.purple};
        border-radius: 0.3rem;
        width: 100%;
      }
    }

    .right {
      visibility: hidden;
      width: 30%;
    }
  }

  ul {
    margin-top: 2rem;

    li {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      color: ${(props) => props.theme.colors.grey};
      margin: 0 2rem;
      list-style: disc;
    }
  }

  table {
    border: 0;
    width: 100%;

    thead {
      color: ${(props) => props.theme.colors.purple};
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};

      tr {
        display: flex;
        gap: 2rem;

        th {
          width: calc(100% / 3);
          text-align: start;

          &:nth-of-type(1) {
            width: 30%;
          }
        }
      }
    }

    tbody {
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};

      tr {
        display: flex;
        gap: 2rem;

        td {
          display: flex;
          width: calc(100% / 3);
          padding-top: 1.5rem;
        }
      }
    }
  }
`;
