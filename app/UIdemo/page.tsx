"use client";
import React from 'react';

import MiddleComponent from './midComponent';
import RightComponent from './rightComponent';
import { useEffect, useState } from "react";
import { User } from "../types";
import { getByCookies } from "@/app/utils/https";
import { LeftComponent } from './leftComponent';

const MyPage: React.FC = () => {
    {/*Set User */}
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getByCookies("user").then((res) => setUser(res));
    }, []);
    
  return (
    <div className="flex h-screen">
        {user && <LeftComponent user={user} />}
        <MiddleComponent />
        <RightComponent />
    </div>
  );
};

export default MyPage;