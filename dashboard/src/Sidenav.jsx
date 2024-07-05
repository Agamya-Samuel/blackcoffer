'use client';

import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import {
	HiArrowSmRight,
	HiChartPie,
	HiInbox,
	HiShoppingBag,
	HiTable,
	HiUser,
	HiViewBoards,
} from 'react-icons/hi';

export function Sidenav() {
	return (
		<Sidebar
			aria-label="Sidebar with content separator example"
			// className="border-red-600 border-2"
		>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item href="#" icon={HiChartPie}>
						Dashboard
					</Sidebar.Item>
					<Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
						<Sidebar.Item href="#">Products</Sidebar.Item>
						<Sidebar.Item href="#">Sales</Sidebar.Item>
						<Sidebar.Item href="#">Refunds</Sidebar.Item>
					</Sidebar.Collapse>
					<Sidebar.Item href="#" icon={HiViewBoards}>
						Kanban
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiInbox}>
						Inbox
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiUser}>
						Users
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiShoppingBag}>
						Products
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiArrowSmRight}>
						Sign In
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiTable}>
						Sign Up
					</Sidebar.Item>
				</Sidebar.ItemGroup>
				<Sidebar.ItemGroup>
					<Sidebar.Item href="#" icon={HiChartPie}>
						Upgrade to Pro
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiViewBoards}>
						Documentation
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={BiBuoy}>
						Help
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
}
