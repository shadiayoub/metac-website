"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Section from "@/components/layouts/Section";
import Title from "@/components/typography/Title";
import Image from "next/image";

const data = [
  {
    x: 1,
    y: Math.exp(1),
    title: "2290",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, quo totam iste odit laborum error nisi mollitia harum. Unde, quo?",
  },
  {
    x: 2,
    y: Math.exp(2),
    title: "2000",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, quo totam iste odit laborum error nisi mollitia harum. Unde, quo?",
  },
  {
    x: 3,
    y: Math.exp(3),
    title: "2181",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, quo totam iste odit laborum error nisi mollitia harum. Unde, quo?",
  },
  {
    x: 4,
    y: Math.exp(4),
    title: "2500",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, quo totam iste odit laborum error nisi mollitia harum. Unde, quo?",
  },
  {
    x: 5,
    y: Math.exp(5),
    title: "2100",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, quo totam iste odit laborum error nisi mollitia harum. Unde, quo?",
  },
];

export default function RoadMap() {
  return (
    <>
      <Section>
        <div className={`w-full`}>
          <Title>RoadMap</Title>

          <div className={`w-full hidden md:block`}>
            <Image
              src={"/roadmap/desktop.png"}
              alt={""}
              width={"1920"}
              height={"1080"}
              className={`w-full h-auto`}
            />
          </div>

          <div className={`w-full block md:hidden`}>
            <Image
              src={"/roadmap/mobile.png"}
              alt={""}
              width={"1080"}
              height={"1920"}
              className={`w-full h-auto`}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
